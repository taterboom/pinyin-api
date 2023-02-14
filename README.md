# Pinyin API

API wrapper of [@napi-rs/pinyin](https://github.com/Brooooooklyn/pinyin)

## Usage

```javascript
fetch("https://pinyin-api.vercel.app/api/generate?wd=你好")
  .then((res) => res.json())
  .then(console.log)
```

## Reference

- `wd: string` // 汉字
- `heteronym: boolean` // 是否处理多音字， 默认 false
- `style: 0 | 1 | 2 | 3 | 4` // 0 不带声调， 1 带声调， 2 声调各个拼音之后以数字 1-4 表示， 3 声调在拼音最后以数字 1-4 表示， 4 首字母
- `segment: boolean` // 是否开启分词。输入有多音字时，开启分词可以获得更准确结果。
