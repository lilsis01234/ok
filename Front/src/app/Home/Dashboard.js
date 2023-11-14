import FusePageSimple from '@fuse/core/FusePageSimple';

function Dashboard(){
    return (
        <FusePageSimple
      content={
        <div className="w-full px-24 md:px-32 pb-24">
            <div className='block'>
                <div className='flex'>
                    <div className='flex-auto w-200 h-96'>Photo collab </div>
                    <div className='flex-auto w-100 h-80'>Mot du jour</div>
                    <div className='flex-auto w-100 h-96'>Calendrier</div>
                </div>
                <div className='flex'>
                    <div className='flex-auto w-200 h-24'> Evènement approchant</div>
                    <div className='flex-auto w-100 h-64'> Actualités</div>
                </div>
            </div>
        </div>}/>
    )
}
export default Dashboard