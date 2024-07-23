def filter_words(input_file, output_file):
    with open(input_file, 'r') as infile:
        words = infile.readlines()

    # Filter out words with three or fewer letters
    long_words = [word for word in words if len(word.strip()) > 3 and not word.strip().startswith('#!')]

    with open(output_file, 'w') as outfile:
        outfile.writelines(long_words)

# Replace 'common_words.txt' with the path to your input file
# Replace 'filtered_words.txt' with the path to your desired output file
filter_words('wiki-100k.txt', 'words.txt')