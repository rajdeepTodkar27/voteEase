import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

const Vote = () => {
  const { register, handleSubmit, watch, formState: { errors,isSubmitting } } = useForm();
  const formRef = useRef(null);
  const selectedCandidate = watch('candidate', '');

  const onSubmit = async (data) => {
    
    console.log('Voted for:', data);
    formRef.current.reset();
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl text-center mb-4'>Voting Card</h2>
        <h3 className='text-xl text-center mb-4'>Election Name</h3>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium'>Select a Candidate</label>
            <select
              className='mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
              {...register('candidate', { required: 'Please select a candidate' })}
            >
              <option value=''>Select a candidate</option>
              <option value='Candidate A'>Candidate A</option>
              <option value='Candidate B'>Candidate B</option>
              <option value='Candidate C'>Candidate C</option>
            </select>
            {errors.candidate && <p className='text-red-500 text-sm'>{errors.candidate.message}</p>}
          </div>

          <div className='flex items-center space-x-2 mt-4'>
            <input
              type='checkbox'
              id='confirmVote'
              className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
              disabled={!selectedCandidate}
              {...register('confirm', {required: "please mark the checkbox"})}

            />
             {errors.confirm && <p className='text-red-500 text-sm'>{errors.confirm.message}</p>}
            <label htmlFor='confirmVote' className='text-gray-700 text-sm'>
              Are you sure you want to vote for this candidate?
            </label>
          </div>

          <button
            type='submit'
            className={`w-full px-4 py-2 rounded-lg ${selectedCandidate ? 'bg-blue-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} text-white`}
            disabled={!selectedCandidate || isSubmitting}
          >
            Confirm Vote
          </button>
        </form>
      </div>
    </div>
  );
};

export default Vote;
