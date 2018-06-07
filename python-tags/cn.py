import io
import jieba
jieba.enable_parallel(4)
# Setting up parallel processes :4 ,but unable to run on Windows
from os import path
from scipy.misc import imread
import matplotlib.pyplot as plt
# jieba.load_userdict("txt\userdict.txt")
# add userdict by load_userdict()
from wordcloud import WordCloud, ImageColorGenerator

d = path.dirname(__file__)

stopwords_path = d + '/temp.txt'
# Chinese fonts must be set
font_path = d + '/fonts/SourceHanSerif/SourceHanSerifK-Light.otf'

# the path to save worldcloud
imgname1 = d + '/chinese/tags.jpg'
# read the mask / color image taken from
back_coloring = imread(path.join(d, d + '/f2e-mask.png'))

# Read the whole text.
text = open(path.join(d, d + '/temp.txt')).read()
print text

# if you want use wordCloud,you need it
# add userdict by add_word()
userdict_list = ['web服务器端', 'V8引擎']


# The function for processing text with Jieba
def jieba_processing_txt(text):
    for word in userdict_list:
        jieba.add_word(word)

    mywordlist = []
    seg_list = jieba.cut(text, cut_all=False)
    liststr = "/ ".join(seg_list)

    with io.open(stopwords_path, encoding='utf-8') as f_stop:
        f_stop_text = f_stop.read()
        f_stop_seg_list = f_stop_text.splitlines()

    for myword in liststr.split('/'):
        if not (myword.strip() in f_stop_seg_list) and len(myword.strip()) > 1:
            mywordlist.append(myword)
    return ' '.join(mywordlist)


wc = WordCloud(font_path=font_path, background_color="white", max_words=2000, mask=back_coloring,
               max_font_size=60, random_state=42, width=1000, height=860, margin=2,)


wc.generate(jieba_processing_txt(text))

# create coloring from image
image_colors_default = ImageColorGenerator(back_coloring)
# save wordcloud
wc.to_file(path.join(d, imgname1))
