import { Box, Divider, List, ListItem, ListItemText, useTheme } from '@mui/material'
import { TodoType } from '../types'
import { greenPrimaryColor } from '../styles/themeGreen'
import { Fragment } from 'react'

export interface ListViewColumn {
    key: string
    label: string
}
interface Props {
    isButton?: boolean
    containerStyle?: React.CSSProperties
    headerBackgroundColor?: string
    columns: ListViewColumn[]
    items: TodoType[]
    style?: React.CSSProperties
}
export default function ListView({
    isButton,
    containerStyle,
    headerBackgroundColor,
    columns,
    items,
    style,
}: Props) {
    const theme = useTheme()

    return (
        <Box style={containerStyle}>
            <List
                style={{ ...style, backgroundColor: 'white', paddingTop: 0, paddingBottom: 0 }}
                component="nav"
                aria-label="main mailbox folders"
            >
                <ListItem
                    style={{
                        backgroundColor: headerBackgroundColor || theme.palette.primary.main,
                    }}
                >
                    {columns.map((column, index) => (
                        <ListItemText key={index} style={{ color: 'white' }}>
                            {column.label}
                        </ListItemText>
                    ))}
                </ListItem>

                {items.map((item, index) => (
                    <Fragment key={index}>
                        <Divider />
                        <ListItem
                            style={{
                                backgroundColor: 'white',
                                borderBottom: `1px solid ${greenPrimaryColor}`,
                            }}
                        >
                            {columns.map((column, index) => (
                                <ListItemText key={index} style={{ flex: 1 }}>
                                    {item[column.key]}
                                </ListItemText>
                            ))}
                        </ListItem>
                    </Fragment>
                ))}
            </List>
        </Box>
    )
}
