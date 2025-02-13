const path = require('path');
const { startCase } = require('lodash');

function iconTemplate(api, opts, { jsx }) {
  const template = api.template.smart({ plugins: ['jsx', 'typescript'] });
  const { componentName, filePath } = opts.state;
  const exportName = componentName.replace('Svg', '');
  const title = startCase(path.basename(filePath, '.svg'));

  return template.ast`
    import * as React from 'react';
    import { Svg, GamutIconProps } from '../../props';

    export const ${exportName} = React.forwardRef<SVGSVGElement, GamutIconProps>(({
      title = "${title}",
      titleId,
      size = 16,
      height = size,
      width = size,
      ...props
    },
      svgRef
    ) => {
      return ${jsx};
    }) as React.ForwardRefExoticComponent<
    GamutIconProps & React.RefAttributes<SVGSVGElement>
  >;
  `;
}
module.exports = iconTemplate;
