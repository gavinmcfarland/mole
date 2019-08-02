import thing1 from '../plugins/thing1'
import chars from '../plugins/chars'
import tokens from '../plugins/tokens'

const plugins = {}

plugins.templates = [thing1]
plugins.models = [chars, tokens]

export default plugins
