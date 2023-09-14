import Notify from 'simple-notify'

export function pushNotify(status = 'success', title, text) {
  return new Notify({
    status,
    title,
    text,
    effect: 'slide',
    speed: 300,
    showIcon: true,
    autoclose: true,
    autotimeout: 3000,
    gap: 20,
    distance: 20,
    type: 1,
    position: 'right top',
  })
}
