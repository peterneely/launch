Event handlers are curried with an info object and then the event.
The info object can contain these props:
{
  name, // model prop to update
  prevValue, // previous value passed to component
  value, // current value set inside component (not necessary if not set by event.target.value)
  defaultValue, // value to set when prop is cleared
  clear, // whether the prop's value should be cleared
  toggle // whether the prop's value should be toggled (true/false)
}
