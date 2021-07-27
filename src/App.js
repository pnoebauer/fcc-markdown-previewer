import React from 'react';
import './App.css';

// imported library via CDN
const marked = window.marked;

const defaultText = `# Markdown previewer - this is a header (H1)

## This is a subheader (H2)

This is how to create a link to wikipedia [wiki](https://en.wikipedia.org/wiki/Main_Page) 

One line code can be created by putting it between backticks. \`<div></div>\`

Multiple lines of code are created by putting 3 backticks at the start and end of the code block.

\`\`\`
// this is a simple js function

function printInput(input) {
	console.log(input);
}

\`\`\`

Text can be made **bold**, _italic_, or **_both!_**

Blockquotes are created as follows: 
> Block Quotes!

Examples for creating lists are illustrated below: 

- Normals lists.
  - Bulleted lists.
     - Lists with various indentation levels.
        - Or even more idented.


1. This is an example of a numbered list.
1. It's sufficient to use only 1s - the previewer will automatically increment the bullet point.!
1. Below an example of an embedded image:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorInput: defaultText,
			editorButton: 'compressed',
			previewButton: 'compressed',
		};
	}

	getMarkdownText = () => {
		// const rawMarkup = marked('This is _Markdown_.', {sanitize: true});
		const rawMarkup = marked(this.state.editorInput, {sanitize: true});
		// console.log(this.state.editorInput, rawMarkup);
		return {__html: rawMarkup};
	};

	handleInput = e => {
		// console.log(e.target.value, 'input');
		this.setState({editorInput: e.target.value});
	};

	// handleKeyDown = e => {
	// 	console.log('hk', e.target.scrollHeight, e.target.scrollWidth);
	// 	// e.target.style.height = 'inherit';
	// 	// e.target.style.height = `${e.target.scrollHeight}px`;
	// 	// In case you have a limitation
	// 	// e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
	// };

	handleExpand = e => {
		// console.log('exp', e.target.id);
		const buttonType = e.target.id;

		this.setState(prevState => ({
			[buttonType]: prevState[buttonType] === 'compressed' ? 'expanded' : 'compressed',
		}));
	};

	render() {
		const {editorInput} = this.state;

		// console.log(this.state);
		return (
			<div className='container-fluid bg-info p-2'>
				<div className='form-group w-50 mx-auto editorWrap'>
					<label className='toolbar' htmlFor='editor'>
						<i
							className={`fa ${
								this.state.editorButton === 'compressed' ? 'fa-arrows-alt' : 'fa-compress'
							} sizing-button`}
							onClick={this.handleExpand}
							id='editorButton'
						></i>{' '}
						Editor
					</label>
					<textarea
						onChange={this.handleInput}
						className='form-control bg-light'
						id='editor'
						name='editor'
						rows='20'
						cols='33'
						value={editorInput}
						// onClick={this.handleKeyDown}
					/>
				</div>

				<div className='form-group w-50 mx-auto previewWrap'>
					<label className='toolbar'>
						<i
							className={`fa ${
								this.state.previewButton === 'compressed'
									? 'fa-arrows-alt'
									: 'fa-compress'
							} sizing-button`}
							onClick={this.handleExpand}
							id='previewButton'
						></i>{' '}
						Preview
					</label>

					<div className='form-control bg-dark'>
						<div
							className='preview bg-dark text-light'
							id='preview'
							dangerouslySetInnerHTML={this.getMarkdownText()}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
