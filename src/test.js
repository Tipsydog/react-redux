function foo(){
    console.log(123)
}

var someFoo = foo;

var abc = {
    someFoo: foo
}
foo();
someFoo;
abc.someFoo;