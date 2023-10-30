class EmbeddingsService
	def initialize(documents)
		@openai = OpenAI::Client.new(access_token: "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")
		@documents = documents
	end

	def create_embeddings
		# This array is used to store the embeddings
		# embeddings_array = []

		# Loop through each element of the array
		@documents.each do |document|
			# Pass the text to the embeddings API which will return a vector and
			# store in the response variable.
			response = @openai.embeddings(
				parameters: {
					model: "text-embedding-ada-002",
					input: document[:text]
				}
			)

			puts response['data'][0]
			
			# Extract the embedding from the response object
			# embedding = response['data'][0]['embedding']

			# Create a Ruby hash containing the vector and the original text
			# embedding_hash = {embedding: embedding, text: document[:text]}
			# Store the hash in an array.
			# embeddings_array << embedding_hash
		end

		# puts embeddings_array
		# embeddings_array
	end
end
