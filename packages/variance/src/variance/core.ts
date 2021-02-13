import { Properties } from 'csstype';
import { get, merge } from 'lodash';

import {
  AbstractProps,
  AbstractTheme,
  CSSObject,
  MediaQueryMap,
  ResponsiveProp,
  ThemeProps,
} from './types/props';
import { AllUnionKeys, Key, KeyFromUnion } from './types/utils';

export interface Prop<T extends AbstractTheme> {
  property: keyof Properties;
  scale?: keyof T;
  transform?: (
    val: unknown,
    prop?: string,
    props?: AbstractProps
  ) => string | number;
}

export interface AbstractPropTransformer<T extends AbstractTheme> {
  prop: string;
  property: keyof Properties;
  scale?: keyof T | unknown;
  transform?:
    | ((val: unknown, prop?: string, props?: AbstractProps) => string | number)
    | unknown;
  styleFn: (value: unknown, prop: string, props: AbstractProps) => CSSObject;
}

export interface AbstractParser<T extends AbstractTheme> {
  (props: AbstractProps): CSSObject;
  propNames: string[];
  config: Record<string, AbstractPropTransformer<T>>;
}

export type Scale<
  T extends AbstractTheme,
  Config extends Prop<T>
> = ResponsiveProp<
  Config['scale'] extends keyof T
    ? keyof T[Config['scale']]
    : Properties[Config['property']]
>;

export interface Transform<
  T extends AbstractTheme,
  P extends string,
  Config extends Prop<T>
> {
  (
    value: Scale<T, Config>,
    prop: P,
    props: { [K in P]?: Scale<T, Config> } & ThemeProps<T>
  ): CSSObject;
}

export interface PropTransformer<
  T extends AbstractTheme,
  P extends string,
  C extends Prop<T>
> extends AbstractPropTransformer<T> {
  prop: P;
  property: C['property'];
  scale?: C['scale'];
  transform?: C['transform'];
  styleFn: Transform<T, P, C>;
}

export interface Parser<
  T extends AbstractTheme,
  Config extends Record<string, AbstractPropTransformer<T>>
> {
  (
    props: {
      [P in keyof Config]?: Parameters<
        Config[P]['styleFn']
      >[2][Config[P]['prop']];
    } &
      ThemeProps<T>
  ): CSSObject;
  propNames: (keyof Config)[];
  config: Config;
}

export interface CSS<T extends AbstractTheme, P extends AbstractParser<T>> {
  (config: Parameters<P>[0]): (props: ThemeProps<T>) => CSSObject;
}

const isMediaArray = (val: unknown): val is (string | number)[] =>
  Array.isArray(val);

const isMediaMap = (val: object): val is MediaQueryMap<string | number> =>
  Object.keys(val).some((key) =>
    ['base', 'xs', 'sm', 'md', 'lg', 'xl'].includes(key)
  );

const identity = <T extends string | number>(val: T) => val;

const getBreakpoints = <T extends AbstractTheme>(props: { theme: T }) => {
  const breakpoints = props?.theme?.breakpoints;
  if (!breakpoints) return null;
  const { xs, sm, md, lg, xl } = breakpoints;
  return {
    map: breakpoints,
    array: [xs, sm, md, lg, xl],
  };
};

export const creator = {
  withTheme<T extends AbstractTheme>() {
    return {
      createParser<Config extends Record<string, AbstractPropTransformer<T>>>(
        config: Config
      ) {
        let cache: { map: T['breakpoints']; array: string[] } | null;
        const propNames = Object.keys(config);
        const parser = (props: { theme: T }) => {
          const styles = {};
          const breakpoints =
            cache === undefined ? getBreakpoints(props) : cache;
          if (cache === undefined) {
            cache = breakpoints;
          }
          propNames.forEach((prop) => {
            const transform = config[prop].styleFn;
            const value = get(props, prop);
            switch (typeof value) {
              case 'string':
              case 'number':
                Object.assign(styles, transform(value, prop, props));
                break;
              case 'object':
                if (!breakpoints) return;
                const breakpointStyles = {};

                if (isMediaArray(value)) {
                  const [base, ...rest] = value;
                  if (base) Object.assign(styles, transform(base, prop, props));
                  rest.forEach((val, i) => {
                    merge(breakpointStyles, {
                      [breakpoints.array[i]]: transform(val, prop, props),
                    });
                  });
                  merge(styles, breakpointStyles);
                  break;
                }
                if (isMediaMap(value)) {
                  const { base = undefined, ...rest } = value;
                  if (base) Object.assign(styles, transform(base, prop, props));
                  Object.keys(rest).forEach((bp: keyof typeof rest) => {
                    merge(breakpointStyles, {
                      [breakpoints.map![bp]]: transform(rest[bp], prop, props),
                    });
                  });

                  merge(styles, breakpointStyles);
                  break;
                }
            }
          });
          return styles;
        };

        return Object.assign(parser, { propNames, config }) as Parser<
          T,
          Config
        >;
      },
      createTransform<P extends string, Config extends Prop<T>>(
        prop: P,
        config: Config
      ): PropTransformer<T, P, Config> {
        const transform = config.transform ?? identity;

        return {
          ...config,
          prop,
          styleFn: (value, prop, props) => {
            const styles: CSSObject = {};

            const properties = Array.isArray(config.property)
              ? config.property
              : [config.property];
            properties.forEach((property) => {
              styles[property] = transform(
                get(props, `theme.${config.scale}.${value}`, value),
                prop,
                props
              );
            });
            return styles;
          },
        };
      },
    };
  },
};

export const variance = {
  withTheme<T extends AbstractTheme>() {
    return {
      compose<Args extends AbstractParser<T>[]>(...parsers: Args) {
        const { createParser } = creator.withTheme<T>();
        type MergedParser = {
          [K in AllUnionKeys<Args[number]['config']>]: KeyFromUnion<
            Args[number]['config'],
            K
          >;
        };
        return createParser(
          parsers.reduce(
            (carry, parser) => ({ ...carry, ...parser.config }),
            {}
          ) as MergedParser
        );
      },
      createCss<Config extends Record<string, Prop<T>>>(
        config: Config
      ): CSS<
        T,
        Parser<
          T,
          {
            [P in Key<keyof Config>]: PropTransformer<T, Key<P>, Config[P]>;
          }
        >
      > {
        return (config) => {
          return (props) => ({});
        };
      },
      createVariant<Config extends Record<string, Prop<T>>>(config: Config) {},
      create<Config extends Record<string, Prop<T>>>(config: Config) {
        const { createTransform, createParser } = creator.withTheme<T>();
        const transforms = {} as {
          [P in Key<keyof Config>]: PropTransformer<T, P, Config[P]>;
        };

        for (const prop in config) {
          transforms[prop] = createTransform(prop, config[prop]);
        }

        const parser = createParser(transforms);
        return parser;
      },
    };
  },
};
