# frozen_string_literal: true

class HomeController < ApplicationController
  protect_from_forgery except: :upload_file # Disable CSRF protection for this action
  layout "home"

  def index
    @home_props = { name: "Home page" }
  end

  def upload_file
    uploaded_file = params[:file]

    pdfService = PdfService.new(uploaded_file)

    text = pdfService.extract_text_from_pdf
    chunks = pdfService.split_into_chunks(text)


    embeddingService = EmbeddingsService.new(chunks.first(5))
    embeddings_hash = embeddingService.create_embeddings

    csvService = CsvService.new
    csvService.create_embeddings_csv(embeddings_hash, uploaded_file.original_filename)

    render json: { message: "Success" }, status: :ok
  end

  def chat
    question = params[:question]
    pineconeService = PineconeService.new
    answer = pineconeService.ask_question(question)
    answer
  end
end
  