Quick replies example:

```js
<div style={{ maxWidth: 350 }}>
  <QuickReplies
    replies={['Yes', 'No', 'Maybe', "I don't understand", 'Select something else...']}
    onSelect={(v) => { alert(v); }}
  />
</div>
```
