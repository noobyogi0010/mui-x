import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { spy } from 'sinon';
import { LineChart } from '@mui/x-charts/LineChart';
import { isJSDOM } from 'test/utils/skipIf';

const config = {
  dataset: [
    { x: 10, v1: 0, v2: 10 },
    { x: 20, v1: 5, v2: 8 },
    { x: 30, v1: 8, v2: 5 },
    { x: 40, v1: 10, v2: 0 },
  ],
  margin: { top: 0, left: 0, bottom: 0, right: 0 },
  xAxis: [{ position: 'none' }],
  yAxis: [{ position: 'none' }],
  width: 400,
  height: 400,
} as const;

describe('LineChart - click event', () => {
  const { render } = createRenderer();

  describe('onAxisClick', () => {
    // can't do Pointer event with JSDom https://github.com/jsdom/jsdom/issues/2527
    it.skipIf(isJSDOM)('should provide the right context as second argument', async () => {
      const onAxisClick = spy();
      const { user } = render(
        <div
          style={{
            width: 400,
            height: 400,
          }}
        >
          <LineChart
            {...config}
            series={[
              { dataKey: 'v1', id: 's1' },
              { dataKey: 'v2', id: 's2' },
            ]}
            xAxis={[{ scaleType: 'point', dataKey: 'x' }]}
            onAxisClick={onAxisClick}
          />
        </div>,
      );
      const svg = document.querySelector<HTMLElement>('svg')!;

      await user.pointer([
        {
          keys: '[MouseLeft]',
          target: svg,
          coords: { clientX: 198, clientY: 60 },
        },
      ]);

      expect(onAxisClick.lastCall.args[1]).to.deep.equal({
        dataIndex: 1,
        axisValue: 20,
        seriesValues: { s1: 5, s2: 8 },
      });

      await user.pointer([
        {
          keys: '[MouseLeft]',
          target: svg,
          coords: { clientX: 201, clientY: 60 },
        },
      ]);

      expect(onAxisClick.lastCall.args[1]).to.deep.equal({
        dataIndex: 2,
        axisValue: 30,
        seriesValues: { s1: 8, s2: 5 },
      });
    });
  });

  describe('onMarkClick', () => {
    it('should add cursor="pointer" to bar elements', () => {
      render(
        <LineChart
          {...config}
          series={[
            { dataKey: 'v1', id: 's1' },
            { dataKey: 'v2', id: 's2' },
          ]}
          xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
          onMarkClick={() => {}}
        />,
      );
      const marks = document.querySelectorAll<HTMLElement>('.MuiMarkElement-root');

      expect(Array.from(marks).map((mark) => mark.getAttribute('cursor'))).to.deep.equal([
        'pointer',
        'pointer',
        'pointer',
        'pointer',
        'pointer',
        'pointer',
        'pointer',
        'pointer',
      ]);
    });

    // can't do Pointer event with JSDom https://github.com/jsdom/jsdom/issues/2527
    it.skipIf(isJSDOM)('should provide the right context as second argument', async () => {
      const onMarkClick = spy();
      const { user } = render(
        <div
          style={{
            width: 400,
            height: 400,
          }}
        >
          <LineChart
            {...config}
            series={[
              { dataKey: 'v1', id: 's1' },
              { dataKey: 'v2', id: 's2' },
            ]}
            xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
            onMarkClick={onMarkClick}
          />
        </div>,
      );

      const marks = document.querySelectorAll<HTMLElement>('.MuiMarkElement-root');

      await user.click(marks[0]);
      expect(onMarkClick.lastCall.args[1]).to.deep.equal({
        type: 'line',
        seriesId: 's1',
        dataIndex: 0,
      });

      await user.click(marks[1]);
      expect(onMarkClick.lastCall.args[1]).to.deep.equal({
        type: 'line',
        seriesId: 's1',
        dataIndex: 1,
      });

      await user.click(marks[4]);
      expect(onMarkClick.lastCall.args[1]).to.deep.equal({
        type: 'line',
        seriesId: 's2',
        dataIndex: 0,
      });
    });
  });

  describe('onAreaClick', () => {
    it('should add cursor="pointer" to bar elements', () => {
      render(
        <LineChart
          {...config}
          series={[
            { dataKey: 'v1', id: 's1', area: true },
            { dataKey: 'v2', id: 's2', area: true },
          ]}
          xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
          onAreaClick={() => {}}
        />,
      );
      const areas = document.querySelectorAll<HTMLElement>('path.MuiAreaElement-root');

      expect(Array.from(areas).map((area) => area.getAttribute('cursor'))).to.deep.equal([
        'pointer',
        'pointer',
      ]);
    });

    // can't do Pointer event with JSDom https://github.com/jsdom/jsdom/issues/2527
    it.skipIf(isJSDOM)('should provide the right context as second argument', async () => {
      const onAreaClick = spy();
      const { user } = render(
        <div
          style={{
            width: 400,
            height: 400,
          }}
        >
          <LineChart
            {...config}
            series={[
              { dataKey: 'v1', id: 's1', area: true },
              { dataKey: 'v2', id: 's2', area: true },
            ]}
            xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
            onAreaClick={onAreaClick}
          />
        </div>,
      );

      const areas = document.querySelectorAll<HTMLElement>('path.MuiAreaElement-root');

      await user.click(areas[0]);
      expect(onAreaClick.lastCall.args[1]).to.deep.equal({
        type: 'line',
        seriesId: 's1',
      });

      await user.click(areas[1]);
      expect(onAreaClick.lastCall.args[1]).to.deep.equal({
        type: 'line',
        seriesId: 's2',
      });
    });
  });

  describe('onLineClick', () => {
    it('should add cursor="pointer" to bar elements', () => {
      render(
        <LineChart
          {...config}
          series={[
            { dataKey: 'v1', id: 's1', area: true },
            { dataKey: 'v2', id: 's2', area: true },
          ]}
          xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
          onLineClick={() => {}}
        />,
      );
      const lines = document.querySelectorAll<HTMLElement>('path.MuiLineElement-root');

      expect(Array.from(lines).map((line) => line.getAttribute('cursor'))).to.deep.equal([
        'pointer',
        'pointer',
      ]);
    });

    // can't do Pointer event with JSDom https://github.com/jsdom/jsdom/issues/2527
    it.skipIf(isJSDOM)('should provide the right context as second argument', async () => {
      const onLineClick = spy();
      const { user } = render(
        <div
          style={{
            width: 400,
            height: 400,
          }}
        >
          <LineChart
            {...config}
            series={[
              { dataKey: 'v1', id: 's1' },
              { dataKey: 'v2', id: 's2' },
            ]}
            xAxis={[{ scaleType: 'band', dataKey: 'x' }]}
            onLineClick={onLineClick}
          />
        </div>,
      );

      const lines = document.querySelectorAll<HTMLElement>('path.MuiLineElement-root');

      await user.click(lines[0]);
      expect(onLineClick.lastCall.args[1]).to.deep.equal({
        type: 'line',
        seriesId: 's1',
      });

      await user.click(lines[1]);
      expect(onLineClick.lastCall.args[1]).to.deep.equal({
        type: 'line',
        seriesId: 's2',
      });
    });
  });
});
