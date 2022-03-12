const textToPost: string = 'Test runs!';
console.log(textToPost);

const run = async () => {
  const smartcli = await import('@pushrocks/smartcli');
  const smartcliInstance = new smartcli.Smartcli();
  console.log(process.argv)
  smartcliInstance.addCommand('sayhello').subscribe(async argvArg => {
    console.log('hello there');
  })
  smartcliInstance.startParse();
}

run();