'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const SetupMetricModel = require('./models/metrics')
const setupAgent = require('./lib/agent')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = SetupMetricModel(config)

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = setupAgent(AgentModel)
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
