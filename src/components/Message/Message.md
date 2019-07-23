Example 1:

```js
import MessageText from './MessageText';

<>
  <Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
    <MessageText>Here?</MessageText>
  </Message>
  <Message authorName="Joe" avatarUrl="https://randomuser.me/api/portraits/lego/6.jpg" isOwn={true} >
    <MessageText>Whats up?</MessageText>
  </Message>
  <Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
    <MessageText>All good man! 😂</MessageText>
  </Message>
  <Message authorName="Joe" avatarUrl="https://randomuser.me/api/portraits/lego/6.jpg" isOwn={true} >
    <MessageText>Look! it even detects links like this - https://developerzen.com - and email addresses` like this@gmail.com</MessageText>
  </Message>
</>
```


With typing indicator:

```js
import TypingIndicator from './TypingIndicator';

<Message authorName="Jack" avatarUrl="https://randomuser.me/api/portraits/lego/2.jpg" isOwn={false} >
  <TypingIndicator />
</Message>
```

With Media:

```js
import MessageTitle from './MessageTitle';
import MessageMedia from './MessageMedia';
import MessageButtons from './MessageButtons';
import MessageButton from './MessageButton';

<Message>
  <MessageTitle title="4% Cash Back" subtitle="There's currently 4% Cash Back at TOMS! and this is a very long text" />
  <MessageMedia>
    <img src="https://static.ebates.com/img/store/10105/toms.jpg" />
  </MessageMedia>
  <MessageButtons>
    <MessageButton label="Go to recipe..." primary />
    <MessageButton label="More" value="more-button" onClick={(l, v) => alert(`"${l}" with value of "${v}"`)} />
  </MessageButtons>
</Message>
```

```js
import MessageTitle from './MessageTitle';
import MessageMedia from './MessageMedia';
import MessageButtons from './MessageButtons';
import MessageButton from './MessageButton';

<Message>
  <MessageMedia>
    <img src="https://static.ebates.com/img/store/10105/toms.jpg" />
  </MessageMedia>
  <MessageTitle title="4% Cash Back" subtitle="There's currently 4% Cash Back at TOMS! and this is a very long text" />
  <MessageButtons>
    <MessageButton label="Go to recipe..." primary />
    <MessageButton label="More" value="more-button" onClick={(l, v) => alert(`"${l}" with value of "${v}"`)} />
  </MessageButtons>
</Message>
```
