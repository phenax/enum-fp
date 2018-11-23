# EnumType

To create an enum instance using the EnumType constructor
```javascript
const Type = EnumType([ 'SubType1', 'SubType2', 'SubType3' ]);

const Maybe = EnumType({
    Just: [ 'value' ],
    Nothing: [],
});
```

You can also specify and document the arguments for the constructor using [enum-fp/types](./type.md)
```javascript
import Enum, { T } from 'enum-fp';

const CanvasObject = EnumType({
    Point: [ T.Number('x'), T.Number('y') ], // Fixed types
    Circle: [ 'radius', 'x', 'y' ], // Dynamic types
    Text: [ T.String() ],
    Clear: [], // 0 arguments. For dynamic number of arguments, use null
});
```


## API

* Constructor

```haskell
EnumType :: Object Array | Array String -> EnumType
```


* `#{SubType}`

```javascript
const point = Canvas.Point(20, 25);
const circle = Canvas.Circle(20, 50, 50);
const clearScreen = Canvas.Clear();
```


* `#match`

Pattern matching for the sub-types
```haskell
match :: (SubType, Object ((...*) -> b)) ~> b
```

```javascript
const circle = Canvas.Circle(20, 50, 50);

const result = Canvas.match(circle, {
    Circle: (radius, x, y) => drawCircle(radius, x, y),
    Point: (x, y) => drawPoint(x, y),
    Clear: () => clearCanvasScreen(),
});
// `result` is the result of the matched operation
```

* `#cata`

An alternate api for match. The arguments are flipped and curried for a nice, point-free experience.

```haskell
cata :: Object ((...*) -> b) ~> SubType -> b
```
```javascript
const draw = Canvas.cata({
    Circle: (radius, x, y) => drawCircle(radius, x, y),
    Point: (x, y) => drawPoint(x, y),
    Clear: () => clearCanvasScreen(),
});

draw(Canvas.Clear());
draw(Canvas.Circle(20, 50, 50));
draw(Canvas.Point(20, 25));
```


* `#caseOf`

Alias for cata. Same api as cata.

```haskell
caseOf :: Object ((...*) -> b) ~> SubType -> b
```

```javascript
const draw = Canvas.caseOf({
    Circle: (radius, x, y) => drawCircle(radius, x, y),
    Point: (x, y) => drawPoint(x, y),
    Clear: () => clearCanvasScreen(),
});

draw(Canvas.Clear());
draw(Canvas.Circle(20, 50, 50));
draw(Canvas.Point(20, 25));
```


* `#reduce`
Alias for cata. Same api as cata.

```haskell
reduce :: Object ((...*) -> b) ~> SubType -> b
```

```javascript
const draw = Canvas.reduce({
    Circle: (radius, x, y) => drawCircle(radius, x, y),
    Point: (x, y) => drawPoint(x, y),
    Clear: () => clearCanvasScreen(),
});

draw(Canvas.Clear());
draw(Canvas.Circle(20, 50, 50));
draw(Canvas.Point(20, 25));
```
