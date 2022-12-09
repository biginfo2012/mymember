import React from 'react';
import GoalsMain from '../goals/index';
import TaskMain from '../task';
import { useParams } from 'react-router-dom';
import TopLabelMainCard from '../components/toplabelcard';

const TaskAndGoalsLayout = () => {
    const { featureType,
        // filtertype,
        otherFilter } = useParams()

    return (
        <div className='pl-1 main-card'>
            <TopLabelMainCard />
            {featureType === 'goals' ? <GoalsMain /> : <TaskMain />}
        </div>
    )
}

export default TaskAndGoalsLayout;
