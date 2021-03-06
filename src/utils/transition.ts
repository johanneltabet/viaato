export default function transition(key: string = 'fade') {
  return {
    fade: {
      enter: 'transition-opacity duration-75',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'transition-opacity duration-150',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
    height: {
      enter: 'transition ease-in-out duration-300 transform',
      enterFrom: 'scale-y-0',
      enterTo: 'scale-y-100',
      leave: 'transition ease-in-out duration-300 transform',
      leaveFrom: 'scale-y-100',
      leaveTo: 'scale-y-0',
      className: 'origin-top overflow-hidden scale-y-0',
    },
    scale: {
      enter: 'transition ease-out duration-75',
      enterFrom: 'transform opacity-0 scale-95',
      enterTo: 'transform opacity-100 scale-100',
      leave: 'transition ease-in duration-150',
      leaveFrom: 'transform opacity-100 scale-100',
      leaveTo: 'transform opacity-0 scale-95',
    },
  }[key]
}
