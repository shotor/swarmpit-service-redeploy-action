import * as core from '@actions/core'
import fetch from 'node-fetch'

async function run(): Promise<void> {
  try {
    const URL = core.getInput('url')
    const STACK = core.getInput('stack')
    const SERVICE = `${STACK}_${core.getInput('service')}`
    const TAG = core.getInput('tag')
    const API_KEY = core.getInput('api-key')

    const servicesResponse = await fetch(
      `${URL}/api/stacks/${STACK}/services`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    )
    const services = (await servicesResponse.json()) as {
      id: string
      serviceName: string
    }[]

    if (!services.length) {
      return core.setFailed('Stack not found')
    }

    const serviceId = services.find(x => x.serviceName === SERVICE)?.id

    if (!serviceId) {
      return core.setFailed('Could not find services')
    }

    const redeployResponse = await fetch(
      `${URL}/api/services/${serviceId}/redeploy?tag=${TAG}`
    )
    const redeployJSON = await redeployResponse.json()

    if (!redeployResponse.ok) {
      return core.setFailed(
        `Redeploy failed with status ${redeployResponse.status} and message: ${redeployJSON}`
      )
    }

    core.info('Redeploy succeeded')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
