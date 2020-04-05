/** @typedef {import('express').Request} Request */
/** @typedef {import('express').Response} Response */

/**
 * @param {Request} req
 * @param {Response} res
 */
async function handler (req, res) {
  const renderer = (await import('./render')).default
  return renderer(req, res)
}

function bootstrap () {
  return handler
}

export default bootstrap
