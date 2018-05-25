Can show avatars only at the last message:

```js
<MessageGroup showAvatar="last" authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={true}>
  <Message>
    <MessageText>Hello?<br/>Is there anybody in there?</MessageText>
  </Message>
  <Message>
    <MessageText>Just nod if you can hear me...<br/>Is there anyone home?</MessageText>
  </Message>
</MessageGroup>

<MessageGroup showAvatar="last" authorName="Jill" avatarUrl="https://randomuser.me/api/portraits/lego/5.jpg" isOwn={false}>
  <Message>
    <MessageText>Come on, now...</MessageText>
  </Message>
  <Message>
    <MessageText>I hear you`re feeling down</MessageText>
  </Message>
  <Message>
    <MessageText>Well I can ease your pain</MessageText>
  </Message>
  <Message>
    <MessageText>Get you on  your feet again</MessageText>
  </Message>
</MessageGroup>
```

Can show avatars only at the first message:

```js
<MessageGroup showAvatar="first" authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={true}>
  <Message>
    <MessageText>Hello?<br/>Is there anybody in there?</MessageText>
  </Message>
  <Message>
    <MessageText>Just nod if you can hear me...<br/>Is there anyone home?</MessageText>
  </Message>
</MessageGroup>

<MessageGroup showAvatar="first" authorName="Jill" avatarUrl="https://randomuser.me/api/portraits/lego/5.jpg" isOwn={false}>
  <Message>
    <MessageText>Come on, now...</MessageText>
  </Message>
  <Message>
    <MessageText>I hear you`re feeling down</MessageText>
  </Message>
  <Message>
    <MessageText>Well I can ease your pain</MessageText>
  </Message>
  <Message>
    <MessageText>Get you on  your feet again</MessageText>
  </Message>
</MessageGroup>
```

Can show avatars on each message:

```js
<MessageGroup showAvatar="each" authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={true}>
  <Message>
    <MessageText>Hello?<br/>Is there anybody in there?</MessageText>
  </Message>
  <Message>
    <MessageText>Just nod if you can hear me...<br/>Is there anyone home?</MessageText>
  </Message>
</MessageGroup>

<MessageGroup showAvatar="each" authorName="Jill" avatarUrl="https://randomuser.me/api/portraits/lego/5.jpg" isOwn={false}>
  <Message>
    <MessageText>Come on, now...</MessageText>
  </Message>
  <Message>
    <MessageText>I hear you`re feeling down</MessageText>
  </Message>
  <Message>
    <MessageText>Well I can ease your pain</MessageText>
  </Message>
  <Message>
    <MessageText>Get you on  your feet again</MessageText>
  </Message>
</MessageGroup>
```
