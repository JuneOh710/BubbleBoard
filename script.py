from sentence_transformers import SentenceTransformer,util
import json
import sys

model = SentenceTransformer('all-MiniLM-L6-v2')

#will get sentences from an array from app.js

sentences = list(sys.argv[1])
 
sentence_embeddings = model.encode(sentences)

cosine_scores = util.pytorch_cos_sim(sentence_embeddings, sentence_embeddings)
cosine_scores

related = {} #keys are the indices of each string from sentences, values are the indices and cosine similarities of sentences that are found to be similar.

for column in range(len(sentences)):
  related[column] = []

  for row in range(len(sentences)):
    if not row in related.keys():
      if cosine_scores[row, column] >=0.5:
        related[column].append([row, float(cosine_scores[row, column])])
    else:
      continue

#Once we have the related dictionary, sort the values by magnitude of cos similarity for every key
related_sorted = {}
for key, value in related.items():
  related_sorted[key] = []
  while value != []:
    max_sim = -2
    max_index = 0
    for i in range(len(value)):
      if max_sim< value[i][1]:
        max_index = i
        max_sim = value[i][1]
    related_sorted[key].append(value[max_index][0])
    value.pop(max_index)
    
related_json = json.dumps(related_sorted)

print(related_json)
sys.stdout.flush()

