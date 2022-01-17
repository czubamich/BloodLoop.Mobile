import React, { FunctionComponent } from "react"
import {Box, IBoxProps} from "native-base"

export const Card: FunctionComponent<IBoxProps> = (props: IBoxProps) =>
<Box 
    p={1} 
    shadow={2} 
    rounded={8} 
    bg='white'
    mx={3}
    {...props}>
    {props.children}
</Box>
