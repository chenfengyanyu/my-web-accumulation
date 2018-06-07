from os import path
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import sys
from wordcloud import WordCloud, STOPWORDS

result = []
# readme_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'README.md')
with open(r'{}/README.md'.format(sys.path[0]), 'r') as fp:
  for line in fp.readlines():
    if line.startswith('### '):
      print line
      result.append(line.replace('### ', ''))
      # result.add(line[2:].strip(0))

print len(result),result

with open('{}/temp.txt'.format(sys.path[0]),'w') as f:
  f.writelines(result);

d = path.dirname(__file__)
mytext = open(path.join(d, 'temp.txt')).read()
wordcloud = WordCloud().generate(mytext)

alice_mask = np.array(Image.open(path.join(d, 'f2e-mask.png')))
stopwords = set(STOPWORDS)
stopwords.add('said')

wc = WordCloud(background_color="white", max_words=2000, mask=alice_mask,
               stopwords=stopwords)

wc.generate(mytext)
wc.to_file(path.join(d, "result.png"))
