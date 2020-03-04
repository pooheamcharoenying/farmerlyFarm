import React from 'react'
import styled from 'styled-components'
import {Droppable} from 'react-beautiful-dnd'
import Task from './task'


const Container = styled.div`
margin:8px;
border:1px solid lightgrey;
border-radius:2px;
display:flex;
flex-direction:column;

`;

const Title = styled.h3`
padding:8px;
`

const TaskList = styled.div`
padding:8px;
transition: background-color 0.2s ease;
background-color:${props => (props.isDaggingOver?'skyblue':'white')};

display:flex;
`

export default class Column extends React.Component{
    render(){
        return(
            <Container>
                    <Droppable droppableId={this.props.column.id}>
                        {(provided,snapshot=>(
                            <TaskList>
                                
                            </TaskList>
                        ))}

                    </Droppable>
            </Container>
        )
    }
}