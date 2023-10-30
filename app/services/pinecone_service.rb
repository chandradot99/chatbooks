class PineconeService
	def initialize
		@client = Langchain::Vectorsearch::Pinecone.new(
			environment: "gcp-starter",
			api_key: "fae670a8-3ff3-437a-98aa-83fa245e36af",
			index_name: "document-embeddings",
			llm: Langchain::LLM::OpenAI.new(api_key: "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")
		)
	end

	def create_embeddings(documents)
		texts = documents.map { |document| document[:text]}
		@client.add_texts(texts: texts)
	end

	def ask_question(question)
		client.ask(question: question)
	end
end
