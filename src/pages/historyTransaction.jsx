import React from 'react'
import {Button} from 'reactstrap'
import {Paper, Table, TableBody,TableHead, TableCell, TableRow, TableFooter} from '@material-ui/core'
class History extends React.Component{

    
    render(){
        return(
            <div className='container mt-4 justify-content-center'>
                <Paper className='p-3'>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Tanggal</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Detail</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>12/07/2019</TableCell>
                                <TableCell>4</TableCell>
                                <TableCell>140000</TableCell>
                                <TableCell><Button color='primary'>Detail</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
    
    
    )
}
}

export default History;