class EmbeddingsService
	def initialize
		api_key = ENV['OPENAI_API_KEY']
    raise 'API key not found in environment variables' unless api_key

		@openai = OpenAI::Client.new(access_token: api_key)
	end

	def create_embeddings_from_pdf_chunks(chunks)
    begin
      response = @openai.embeddings(
        parameters: {
          model: "text-embedding-ada-002",
          input: chunks
        }
      )

      if response["error"]
        raise StandardError, response["error"]["message"]
      else
        embeddings_data = response['data']
        embeddings_hash = {}
    
        embeddings_data.each_with_index do |data, index|
          text = chunks[index]
          embedding = data['embedding']
          embeddings_hash[text] = embedding
        end
    
        { success: true, embeddings_hash: embeddings_hash }
      end
    rescue StandardError => e
      puts e.message
      {  success: false, message: e.message }
    end
	end

	def create_user_input_embedding(user_input)
		response = @openai.embeddings(
			parameters: {
				model: "text-embedding-ada-002",
				input: user_input
			}
		)

		response['data'][0]["embedding"]
	end

end
