function dependencyResolver(tasks, dependencies) {
  // convert input task string in to array
  tasks = JSON.parse(tasks.replace(/([^\[\],\s]+)/g, '"$&"'));
  // convert input dependencies string in to array
  dependencies = JSON.parse(dependencies.replace(/([^\[\],\s]+)/g, '"$&"'));
  // if there are no dependencies return tasks
  if (!dependencies.length) {
    return tasks;
  } else {
    let result = [];
    try {
      dependencies.forEach((dependency) => {
        // if both dependent and dependency are not exist in result, push it.
        if (
          !result.includes(dependency[3]) &&
          !result.includes(dependency[0])
        ) {
          result.push(dependency[3]);
          result.push(dependency[0]);
        }
        // if both dependent present and dependency is not persent in result, then add dependency at first position in result.
        else if (
          result.includes(dependency[0]) &&
          !result.includes(dependency[3])
        ) {
          result.unshift(dependency[3]);
        }
        // otherwise throw an error of cyclic dependency.
        else {
          throw "Error - this is a cyclic dependency";
        }
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}
module.exports = dependencyResolver;
