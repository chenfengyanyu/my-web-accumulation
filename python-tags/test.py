from os import path
import sys
from wordcloud import WordCloud

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

import matplotlib.pyplot as plt
plt.imshow(wordcloud, interpolation='bilinear')
plt.axis("off")

# lower max_font_size
wordcloud = WordCloud(max_font_size=40).generate(mytext)
plt.figure()
plt.imshow(wordcloud, interpolation="bilinear")
plt.axis("off")
plt.show()

