# frozen_string_literal: true

class HomeController < ApplicationController
  protect_from_forgery except: :chat # Disable CSRF protection for this action
  layout "home"

  def index
    @home_props = { name: "Home page" }
  end

  def upload_pdf
    uploaded_file = params[:file]

    pdfService = PdfService.new(uploaded_file)

    text = pdfService.extract_text_from_pdf
    chunks = pdfService.split_into_chunks(text)

    embeddingService = EmbeddingsService.new
    embeddings_hash = embeddingService.create_embeddings_from_pdf_chunks(chunks)

    csvService = CsvService.new
    csvService.create_embeddings_csv(embeddings_hash)

    render json: { message: "PDF file uploaded and Embeddings Created Successfully" }, status: :ok
  end


  def fetch_pdf
    pdf_path = Rails.root.join('public', "pdfs", "sample_book.pdf")
    send_file pdf_path, type: 'application/pdf', disposition: 'inline'
  end

  def chat
    isSamplePDF = params[:isSamplePDF]
    question = params[:question]

		embeddings_csv_path = Rails.root.join("public", "embeddings", isSamplePDF ? "sample_book.pdf.embeddings.csv" : "user_book.pdf.embeddings.csv")

    chatService = ChatService.new(embeddings_csv_path)

    top_embeddings = chatService.get_top_embeddings(question)
    context_text = top_embeddings.map { |embedding| embedding[:text] }
    response = chatService.conversation(context_text, question)

    render json: { message: "Success", response: response }, status: :ok
  end
end
  