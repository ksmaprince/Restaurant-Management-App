import * as React from 'react';
import { PressableAndroidRippleConfig, StyleProp, ViewStyle, GestureResponderEvent, ColorValue } from 'react-native';
import type { PressableProps } from './Pressable';
import type { ThemeProp } from '../../types';
export declare type Props = PressableProps & {
    borderless?: boolean;
    background?: PressableAndroidRippleConfig;
    centered?: boolean;
    disabled?: boolean;
    onPress?: (e: GestureResponderEvent) => void | null;
    onLongPress?: (e: GestureResponderEvent) => void;
    onPressIn?: (e: GestureResponderEvent) => void;
    onPressOut?: (e: GestureResponderEvent) => void;
    rippleColor?: ColorValue;
    underlayColor?: string;
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    theme?: ThemeProp;
};
declare const TouchableRipple: {
    ({ style, background, borderless, disabled: disabledProp, rippleColor, underlayColor, children, theme: themeOverrides, ...rest }: Props): React.JSX.Element;
    supported: boolean;
};
export default TouchableRipple;
//# sourceMappingURL=TouchableRipple.native.d.ts.map