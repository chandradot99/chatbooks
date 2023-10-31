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

  def split_into_chunks(text)
		chunks = Langchain::Chunker::RecursiveText.new(text).chunks
		chunks.map { |chunk| chunk[:text] }
  end
end
