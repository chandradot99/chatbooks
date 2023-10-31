class CsvService
	def initialize
	end

	def create_pages_csv(pages, csv_name)
		csv_path = Rails.root.join("public", "csvs", "#{csv_name}.csv")

		CSV.open(csv_path, 'w') do |csv|
			csv << ["title", "content"]
			@pages.each do |page|
				csv << [page[:title], page[:content]]
			end
		end
	end

	def create_embeddings_csv(embeddings_hash, csv_name)
		csv_path = Rails.root.join("public", "embeddings", "#{csv_name}_embedding.csv")

    CSV.open(csv_path, "wb") do |csv|
			# Write header row
      csv << ["Text", "Embedding"]

      embeddings_hash.each do |text, embedding|
        csv << [text, embedding]
      end
    end
	end

end
