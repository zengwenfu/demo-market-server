# 菲麦前端周刊第 {{num}} 期
> {{summary}}
{% for column in columns %}
## {{column.name}}
{% set i=0 %}
{% for article in column.articles%}
{% set i=i+1 %}
### {{i}}）[{{article.title}}]({{article.url}})@{{article.author}}
{{article.summary}}
{% endfor %}
{% endfor %}