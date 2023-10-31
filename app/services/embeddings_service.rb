class EmbeddingsService
	def initialize(texts)
		api_key = ENV['OPENAI_API_KEY']
    raise 'API key not found in environment variables' unless api_key

		@openai = OpenAI::Client.new(access_token: api_key)
		@texts = texts
	end

	def create_embeddings
		response = @openai.embeddings(
			parameters: {
				model: "text-embedding-ada-002",
				input: @texts
			}
		)

		embeddings_data = response['data']
    embeddings_hash = {}

    embeddings_data.each_with_index do |data, index|
      text = @texts[index]
      embedding = data['embedding']
      embeddings_hash[text] = embedding
    end

    embeddings_hash
	end
end
