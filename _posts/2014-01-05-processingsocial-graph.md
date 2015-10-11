---
layout: post
title: ProcessingでSocial Graphを作る
date: '2014-01-05T05:27:00.000Z'
author: Suzuki MilanPaak
tags:
- Processing
modified_time: '2014-01-05T05:38:35.221Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7949146972056335208
blogger_orig_url: http://engineerflies.blogspot.com/2014/01/processingsocial-graph.html
---

ProcessingでSocail Graphを作ってみました。自分とその友達同士の共通の友人の数を線の太さに表したソーシャルグラフです。

 [![](https://www.diigo.com/item/p/qpeeeqszbsebdpdorzbcebboep)](https://www.diigo.com/item/p/qpeeeqszbsebdpdorzbcebboep)
  
世にいろんなソーシャルグラフのライブラリがあるのでそれらを使えば一瞬なんだろうけど幾何学的なことを理解したくて、本を読みながら部品から一個一個全部作りました。詳しくは書かないけれどこんな感じのテクニックを使っています。  
  
  
  

- 正N角形

- 三角関数 cos, sin

- ベジェ曲線

  

  
# コントロール的なロジックはSocialGraphというclassに集約されていて、引数はcsvファイルと、半径です。  

  
SocialGraph(SocialGraphCsv csv, int radius)   
  
こういうCSVを渡すとカラム数を拾って自動的に正N角形を描写して、人名や線を描写してくれます。  
  

<person a=""><another b="" person=""><span style="background-color: white; font-family: Consolas, 'Liberation Mono', Courier, monospace; font-size: 11.818181991577148px; line-height: 14.545454025268555px; white-space: pre;"><br></span></another></person><person a=""><another b="" person=""><table border="1" cellpadding="0" cellspacing="0" style="border: solid 1 #FFFFAA; width: 770px;">
<!--StartFragment--> <colgroup>
<col span="10" style="width: 77pt;" width="77"> </colgroup>
<tbody>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt; width: 77pt;" width="77"></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Tatsuya Suzuki</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Emi Ito</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Bruno Barroso</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Mattew Day</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Maxim Dokhlov</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Mehmet Bagbekleyen</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Alex Yixnitsky</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Stuart Gardner</span></td> <td style="width: 77pt;" width="77"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Derrick May</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Tatsuya Suzuki</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">50</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">19</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">10</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">9</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">11</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">15</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Emi Ito</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">3</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">3</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Bruno Barroso</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">4</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">3</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">17</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Mattew Day</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">4</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">5</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Maxim Dokhlov</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">4</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Mehmet Bagbekleyen </span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">2</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Alex Yixnitsky</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Stuart Gardner</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">1</span></td> </tr>
<tr height="18" style="height: 18.0pt;"> <td height="18" style="height: 18.0pt;"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">Derrick May</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> <td align="right"><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;">0</span></td> </tr>
<!--EndFragment--> </tbody>
</table></another></person><person a=""><another b="" person=""><span style="font-family: Arial, Helvetica, sans-serif; font-size: x-small;"><br></span></another></person>  
  
<person a=""><another b="" person=""><span style="background-color: white; font-family: Consolas, 'Liberation Mono', Courier, monospace; font-size: 11.818181991577148px; line-height: 14.545454025268555px; white-space: pre;">総当たり（隣接配列）のため下半分は上半分の繰り返しであるため全て０です。1は共通の友人が私しかいないことを意味しています。</span></another></person>  
  
  
  
共通の友人の数は以下のURLで取得できます  
https://www.facebook.com/<person A><person a="">?and=&lt;person B&gt;<another b="" person=""><br></another></person>  
<person a=""><another b="" person=""> </another></person><person a=""><another b="" person=""><br></another></person>  
<person a=""><another b="" person=""><br></another></person><person a=""><another b="" person=""># クラス構成</another></person>  
  

- SocailGraph: 統括コントローラ
- Coordinate: 座標を保持する
- EquilateralPolygon: 等辺三角形を描写する
- nodeNames: ノード（Facebookの例だと）の名前
- FamiliarityAsLine: 親しさを線（の太さ）で表します

nodeNamesとFamiliarityAsLineはEquilateralPolygonに依存していますが、それぞれ独立した画像として再利用可能です。

  

  
<person a=""><another b="" person=""><br></another></person><person a=""><another b="" person=""><person a=""><another b="" person=""># ソースコード</another></person></another></person>  
<person a=""><another b="" person=""><person a=""><another b="" person=""><br></another></person></another></person><person a=""><another b="" person=""><person a=""><another b="" person="">まだ整えられそう。ProcessingでOOPする難しさなんかも<a href="http://engineerflies.blogspot.jp/2014/01/processing.html">過去の記事</a>にまとめました。</another></person></another></person>  
<person a=""><another b="" person=""><person a=""><another b="" person=""><br></another></person>&lt;script src="https://gist.github.com/suzukimilanpaak/8264451.js"&gt;&lt;/script&gt;</another></person>  
<person a=""><another b="" person=""><br></another></person><person a=""><another b="" person=""><br></another></person><person a=""><another b="" person=""># 感想</another></person>  
<person a=""><another b="" person=""><br></another></person><person a=""><another b="" person="">java(Processing Language)を久しぶりに書いたけど、今更OOPを気軽にやれない感じだった。ProcessingでOOPしようとするのが結構めんどくさい（不可能ではない）。ので再利用制のあるコードを書いて共有するのがProcessingの世界では手間。Javaの最近の文法を知らないけど、あの言語にあるこんなしようを使えばもっと奇麗になるかも。</another></person>  
<person a=""><another b="" person=""><br></another></person><person a=""><another b="" person="">ソーシャルグラフは</another></person>三角関数とπの組み合わせしか使わないので意外と簡単。  
  
<person a=""><another b="" person=""><br></another></person>