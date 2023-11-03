class ChatService
  def initialize(csv_file_path)
		api_key = ENV['OPENAI_API_KEY']
		raise 'API key not found in environment variables' unless api_key

    @embeddings_data = load_embeddings_from_csv(csv_file_path)
		@llm = Langchain::LLM::OpenAI.new(api_key: api_key)
  end

  def load_embeddings_from_csv(file_path)
    embeddings_data = []
    CSV.foreach(file_path, headers: true) do |row|
      text = row['Text']
      embedding = row['Embedding']
      embeddings_data << { text: text, embedding: embedding }
    end
    embeddings_data
  end

  def get_user_input_embedding(text)
    embeddingsService = EmbeddingsService.new
    embeddingsService.create_user_input_embedding(text)
  end

	def calculate_similarity(vecA, vecB)
		return nil unless vecA.is_a? Array
		return nil unless vecB.is_a? Array
		return nil if vecA.size != vecB.size
		
		dot_product = 0
		vecA.zip(vecB).each do |v1i, v2i|
			dot_product += v1i * v2i
		end
		
		a = vecA.map { |n| n ** 2 }.reduce(:+)
		b = vecB.map { |n| n ** 2 }.reduce(:+)
		
		# Avoid division by zero
		if a.zero? || b.zero?
			return 0
		else
			return dot_product / (Math.sqrt(a) * Math.sqrt(b))
		end
	end
	
  def get_top_embeddings(user_question, topLimit = 5)
    user_embedding = get_user_input_embedding(user_question)

    sorted_embeddings = @embeddings_data.sort_by do |data|
      calculate_similarity(user_embedding, data[:embedding])
    end.reverse

    top_embeddings = sorted_embeddings.take(topLimit)
    top_embeddings
  end

	def conversation(context, message)
		prompt = "
			You are a chatbot and you will give responses to user questions based on only the context section
			[context] #{context}
		"
    chat = Langchain::Conversation.new(llm: @llm)
    chat.set_context(prompt)
    chat.message(message)
	end

end
