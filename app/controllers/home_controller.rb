# frozen_string_literal: true

class HomeController < ApplicationController
  protect_from_forgery except: :upload_file # Disable CSRF protection for this action
  layout "home"

  def index
    @home_props = { name: "Home page" }
  end

  def upload_file
    uploaded_file = params[:file]
    if uploaded_file
      # Get the IO object from the uploaded file
      file_io = uploaded_file.tempfile

      # Read the content of the uploaded file
      pdf_text = extract_text_from_pdf(file_io)
      chunks = split_into_chunks(pdf_text)

      create_embeddings(chunks)

      render json: { message: "File uploaded successfully", size: chunks.length }, status: :ok
    else
      render json: { error: "No file uploaded" }, status: :unprocessable_entity
    end
  end

  def chat
    question = params[:question]
    pineconeService = PineconeService.new
    answer = pineconeService.ask_question(question)
    answer
  end

  private

  def extract_text_from_pdf(file_io)
    pdf_text = ''
    reader = PDF::Reader.new(file_io)

    # Extract text from the first 10 pages of the PDF
    reader.pages.each do |page|
      pdf_text += page.text
    end

    pdf_text
  end

  def split_into_chunks(text)
    return Langchain::Chunker::RecursiveText.new(text).chunks
  end

  def create_embeddings(chunks)
    # pineconeService = PineconeService.new
    chunks_one = chunks.take(10)
    embeddingService = EmbeddingsService.new(chunks_one)
    # pineconeService.create_embeddings(chunks_one)
    embeddingService.create_embeddings
  end
end
  