function* generator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

let func = generator()
console.log(undefined == 0);