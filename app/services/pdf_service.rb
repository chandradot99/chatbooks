class PdfService
	def initialize(pdf)
		@file_io = pdf.tempfile
	end

	def create_pages_hash
		reader = PDF::Reader.new(@file_io)
		pages = [];

    reader.pages.each_with_index do |page, index|
			page_hash = {title: "Page #{index + 1}", content: page.text}
      pages << page_hash
    end
		pages
	end

	def extract_text_from_pdf
		text = ''
    reader = PDF::Reader.new(@file_io)

    reader.pages.each do |page|
      text += page.text
    end

    text.gsub(/\n/, '')
	end

	# Splits the input text into chunks using Langchain::Chunker::RecursiveText.
	# 
	# Args:
	#   text (String): The input text to be split into chunks.
	#
	# Returns:
	#   Array: An array of chunks after processing the input text
  def split_into_chunks(text)
		# Get chunks from Langchain::Chunker::RecursiveText.new(text).chunks
		chunks = Langchain::Chunker::RecursiveText.new(text).chunks

		# Map the response to return only the :text part of each chunk
		# The response format is assumed to be {:cursor, :text}
		chunks.map { |chunk| chunk[:text] }
  end
end
