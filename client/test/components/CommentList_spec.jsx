/* beautify ignore:start */
// pending https://github.com/beautify-web/js-beautify/issues/382
import { React, expect, TestUtils } from '../test_helper';
import { List, Map } from 'immutable';
import CommentList from '../../app/components/CommentList';
import Comment from '../../app/components/Comment';
/* beautify ignore:end */

const {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  scryRenderedComponentsWithType
} = TestUtils;

describe('CommentList', () => {
  const comments = List.of(
    Map({
      author: 'Frank',
      text: 'hi',
    }),
    Map({
      author: 'Furter',
      text: 'ho',
    }),
  );

  it('renders a list of Comments in reverse order', () => {
    const component = renderIntoDocument(
      /* beautify preserve:start */
        // js-prettify doesnt like the $$ in jsx
        <CommentList $$comments={comments}/>
        /* beautify preserve:end */
    );
    const list = scryRenderedComponentsWithType(component, Comment);
    expect(list.length).to.equal(2);
    expect(list[0].props.author).to.equal('Furter');
    expect(list[1].props.author).to.equal('Frank');
  });

  it('renders an alert if errors', () => {
    const component = renderIntoDocument(
      /* beautify preserve:start */
      <CommentList $$comments={comments} error="zomg" />
      /* beautify preserve:end */
    );

    const alert = findRenderedDOMComponentWithTag(component, 'strong');
    expect(alert.textContent).to.equal('Comments could not be retrieved. ');
  });
});
