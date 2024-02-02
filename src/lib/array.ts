const ArrayEqual =  (arrayA: string[], arrayB:string[]) => {
  if (arrayA.length !== arrayB.length) {
    return false;
  }
  for (const part of arrayA) {
    if (!arrayB.includes(part)) {
      return false;
    }
  }
  return true;
}

export {ArrayEqual};