# frozen_string_literal: true

class HomeController < ApplicationController
  protect_from_forgery except: :chat # Disable CSRF protection for this action
  layout "home"

  def index
    @home_props = { name: "Home page" }
  end

  def upload_file
    uploaded_file = params[:file]

    pdfService = PdfService.new(uploaded_file)

    text = pdfService.extract_text_from_pdf
    chunks = pdfService.split_into_chunks(text)


    embeddingService = EmbeddingsService.new
    embeddings_hash = embeddingService.create_embeddings_from_pdf_chunks(chunks)

    csvService = CsvService.new
    csvService.create_embeddings_csv(embeddings_hash, uploaded_file.original_filename)

    render json: { message: "Success" }, status: :ok
  end

  def chat
    question = params[:question]
		embeddings_csv_path = Rails.root.join("public", "embeddings", "book.pdf.embeddings.csv")

    @chatService ||= ChatService.new(embeddings_csv_path)

    top_embeddings = @chatService.get_top_embeddings(question)
    context_text = top_embeddings.map { |embedding| embedding[:text] }
    response = @chatService.conversation(context_text, question)

    render json: { message: "Success", response: response }, status: :ok
  end
end
  