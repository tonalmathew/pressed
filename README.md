# pressed

### How to install

`npm i @tonalmathew/pressed`

### How to use

```js
  import pressed from '@tonalmathew/pressed'

  pressed.use({
    preventDefault: true, 
    upperCase: true, 
    styles: {
      backgroundColor: 'cyan',
      color: 'black',
      // add more
    }
  })

  pressed.modify({'Control': 'Ctrl', 'Meta': 'Win', ' ': 'Space'})

  pressed.dShift()

```
