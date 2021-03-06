# coding=utf-8
# This script generates records in AMF0 and AMF3 format for the amf-grid example
# and saves the data as amf0-pangrams.amf and amf-3-pangrams.amf
from pyamf import remoting
from pyamf.remoting import Envelope
from pyamf.remoting import Response

records = [{
    "language": "Danish",
    "text": "Quizdeltagerne spiste jordb  r med fl  de, mens cirkusklovnen Wolther spillede p   xylofon"
}, {
    "language": "German",
    "text": "Falsches   ben von Xylophonmusik qu  lt jeden gr    eren Zwerg"
}, {
    "language": "Greek",
    "text": "                                                                                                       "
}, {
    "language": "English",
    "text": "The quick brown fox jumps over the lazy dog"
}, {
    "language": "Spanish",
    "text": "El ping  ino Wenceslao hizo kil  metros bajo exhaustiva lluvia y fr  o, a  oraba a su querido cachorro",
}, {
    "language": "French",
    "text": "l'  le exigu   O   l'ob  se jury m  r F  te l'ha   volap  k,   ne ex a  quo au whist,   tez ce v  u d    u"
}, {
    "language": "Irish Gaelic",
    "text": "D'fhuascail   osa,   rmhac na h  ighe Beannaithe, p  r   ava agus   dhaimh"
}, {
    "language": "Hungarian",
    "text": "  rv  zt  r   t  k  rf  r  g  p"
}, {
    "language": "Icelandic",
    "text": "K  mi n     xi h  r ykist   j  fum n   b    i v  l og   drepa"
}, {
    "language": "Japanese (Hiragana)",
    "text": "                                                                                                                                                "
}, {
    "language": "Japanese (Katakana)",
    "text": "                                                                                                                                                       "
}, {
    "language": "Hebrew",
    "text": "                                                                                          "
}, {
    "language": "Polish",
    "text": "Pchn     w t       d   je  a lub o  m skrzy   fig"
}, {
    "language": "Russian",
    "text": "                                             ?     ,                                           !"
}] 

def write_envelope(version, filename):
    envelope = Envelope(amfVersion=version)
    message = Response(records)
    envelope.__setitem__('message', message);
    stream = remoting.encode(envelope)
    file = open(filename, 'w+')
    file.write(stream.getvalue())

write_envelope(0, 'amf0-pangrams.amf')
write_envelope(3, 'amf3-pangrams.amf')