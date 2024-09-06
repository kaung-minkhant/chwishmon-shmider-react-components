export function getSpring(args: {
  from: number;
  to: number;
  tolerance?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}) {
  let { damping, from, mass, stiffness, to, tolerance } = args;
  damping = damping ?? -0.97;
  mass = mass ?? 0.1;
  stiffness = stiffness ?? -30;
  tolerance = tolerance ?? 0.01;
  let x = from;
  let v = 0;
  let a = 0;
  let spring_x = 0;
  let damper_x = 0;
  return (prev_from: number = x, dt: number = 10) => {
    const error = prev_from - to
    if (Math.abs(error) > tolerance) {
      spring_x = stiffness * (prev_from - to);
      damper_x = damping * v;
      a = (spring_x + damper_x) / mass;
      v += a * (dt / 1000);
      return {
        value: prev_from + v * (dt / 1000),
        done: false
      };
    }
    return {
      value: prev_from,
      done: true
    };
  };
}
