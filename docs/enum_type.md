# EnumType

To create an enum instance using the EnumType constructor
```javascript
const Type = EnumType([ 'SubType1', 'SubType2', 'SubType3' ]);

const Maybe = EnumType({
    Just: [ 'value' ],
    Nothing: [],
});
```
You can also specify and document the number of arguments for the constructor
```javascript
const Canvas = EnumType({
    Point: [ 'x', 'y' ],
    Circle: [ 'radius', 'x', 'y' ],
    Clear: [], // 0 arguments. For dynamic number of arguments, use null
});
```
## API
Constructor

```haskell
EnumType :: Object Array | Array String -> EnumType
```
`#{SubType}`

```javascript
const point = Canvas.Point(20, 25);
const circle = Canvas.Circle(20, 50, 50);
const clearScreen = Canvas.Clear();
```
`#match`

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
`#caseOf`

An alternate api for match. The arguments are flipped and curried for a nice, point-free experience.

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