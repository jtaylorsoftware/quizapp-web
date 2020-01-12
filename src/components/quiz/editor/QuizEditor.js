import React from 'react'
import '../../../styles/quiz.css'
import Footer from '../common/Footer'

const QuizEditor = () => {
  return (
    <>
      <section className='container'>
        <section class='content col-lg-8 col-sm-10 mx-auto mt-3'>
          <form>
            <div class='row mb-4'>
              <div class='col d-flex align-items-center'>
                <h1 class='mb-0'>Quiz Title</h1>
                <button class='btn btn-success btn-sm ml-auto'>Edit</button>
              </div>
            </div>
            <div class='row mb-4'>
              <div class='col d-flex align-items-center'>
                <div class='custom-control custom-switch'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='privacySwitch'
                    checked
                  />
                  <label class='custom-control-label' for='privacySwitch'>
                    Private Quiz
                  </label>
                </div>
              </div>
            </div>
            <div class='row mb-4'>
              <div className='col'>
                <div className='row'>
                  <div className='col'>
                    <label for='allowedUsers'>Allowed users:</label>
                  </div>
                </div>
                <div className='row'>
                  <div class='col-6'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='User1, User2, ...'
                      id='allowedUsers'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class='row mb-4'>
              <div className='col'>
                <div className='row'>
                  <div className='col'>
                    <label for='expiration'>Expires on:</label>
                  </div>
                </div>
                <div className='row'>
                  <div class='col-6'>
                    <input
                      className='form-control'
                      type='datetime-local'
                      id='expiration'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class='row mb-2'>
              <div className='col'>
                <div className='row'>
                  <div class='col d-flex align-items-center'>
                    <h2 class='mb-2'>
                      1. <span>Question 1</span>
                    </h2>
                    <button class='btn btn-danger btn-sm ml-auto'>
                      Delete
                    </button>
                    <button class='btn btn-primary btn-sm ml-2'>Edit</button>
                  </div>
                </div>
                <div class='row mb-3'>
                  <div class='col-sm-6 mr-auto'>
                    <h5>
                      Correct Answer: <span>1</span>
                    </h5>
                  </div>
                </div>
                <div class='answer answer--selected'>
                  <div class='row mt-2'>
                    <div class='col d-flex align-items-start'>
                      <div class='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question1'
                          id='answer1'
                          value='1'
                          checked
                        />
                        <label for='answer1'>1.</label>
                      </div>
                      <button class='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button class='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label class='px-4' for='answer1'>
                        Answer 1 Text
                      </label>
                    </div>
                  </div>
                </div>
                <div className='answer'>
                  <div class='row mt-2'>
                    <div class='col d-flex align-items-start'>
                      <div class='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question1'
                          id='answer2'
                          value='2'
                        />
                        <label for='answer2'>2.</label>
                      </div>
                      <button class='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button class='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label class='px-4' for='answer2'>
                        Answer 2 Text
                      </label>
                    </div>
                  </div>
                </div>
                <div className='answer'>
                  <div class='row mt-2'>
                    <div class='col d-flex align-items-start'>
                      <div class='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question1'
                          id='answer3'
                          value='3'
                        />
                        <label for='answer3'>3.</label>
                      </div>
                      <button class='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button class='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label class='px-4' for='answer3'>
                        Answer 3 Text
                      </label>
                    </div>
                  </div>
                </div>

                <div class='row mt-2'>
                  <div class='col d-flex align-items-center justify-content-start'>
                    <button class='btn btn-secondary btn-sm mr-2'>
                      Add Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class='row mb-2'>
              <div className='col'>
                <div className='row'>
                  <div class='col d-flex align-items-center'>
                    <h2 class='mb-2'>
                      2. <span>Question 2</span>
                    </h2>
                    <button class='btn btn-danger btn-sm ml-auto'>
                      Delete
                    </button>
                    <button class='btn btn-primary btn-sm ml-2'>Edit</button>
                  </div>
                </div>
                <div class='row mb-3'>
                  <div class='col-sm-6 mr-auto'>
                    <h5>
                      Correct Answer: <span>1</span>
                    </h5>
                  </div>
                </div>
                <div class='answer answer--selected'>
                  <div class='row mt-2'>
                    <div class='col d-flex align-items-start'>
                      <div class='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question2'
                          id='answer1'
                          value='1'
                          checked
                        />
                        <label for='answer1'>1.</label>
                      </div>
                      <button class='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button class='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label class='px-4' for='answer1'>
                        Answer 1 Text
                      </label>
                    </div>
                  </div>
                </div>
                <div className='answer'>
                  <div class='row mt-2'>
                    <div class='col d-flex align-items-start'>
                      <div class='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question2'
                          id='answer2'
                          value='2'
                        />
                        <label for='answer2'>2.</label>
                      </div>
                      <button class='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button class='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label class='px-4' for='answer2'>
                        Answer 2 Text
                      </label>
                    </div>
                  </div>
                </div>
                <div className='answer'>
                  <div class='row mt-2'>
                    <div class='col d-flex align-items-start'>
                      <div class='form-check mb-1'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='question2'
                          id='answer3'
                          value='3'
                        />
                        <label for='answer3'>3.</label>
                      </div>
                      <button class='btn btn-danger btn-sm ml-auto'>
                        Delete
                      </button>
                      <button class='btn btn-secondary btn-sm ml-2'>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <label class='px-4' for='answer3'>
                        Answer 3 Text
                      </label>
                    </div>
                  </div>
                </div>

                <div class='row mt-2'>
                  <div class='col d-flex align-items-center justify-content-start'>
                    <button class='btn btn-secondary btn-sm mr-2'>
                      Add Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class='row mt-4'>
              <div class='col d-flex align-items-center justify-content-start'>
                <button class='btn btn-primary btn-sm'>Add Question</button>
              </div>
            </div>
          </form>
        </section>
      </section>
      <Footer />
    </>
  )
}

export default QuizEditor